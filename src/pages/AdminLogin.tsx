
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFirstAdmin, setIsFirstAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Verify if user is an admin
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
        
        if (adminData) {
          navigate('/admin/cms');
        }
      }
    };
    
    // Check if this is the first admin signup
    const checkIfFirstAdmin = async () => {
      const { count, error } = await supabase
        .from('admin_users')
        .select('*', { count: 'exact', head: true });
      
      if (!error && count === 0) {
        setIsFirstAdmin(true);
      }
    };
    
    checkUser();
    checkIfFirstAdmin();
  }, [navigate]);

  // Clean up local storage to avoid auth issues
  const cleanupAuthState = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Clean up existing state to avoid conflicts
      cleanupAuthState();
      
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      // Check if user is an admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (adminError || !adminData) {
        await supabase.auth.signOut();
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão de administrador.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao painel de administração.",
        });
        navigate('/admin/cms');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erro no login",
        description: error.message || "Ocorreu um erro durante o login.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro na senha",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Clean up existing state to avoid conflicts
      cleanupAuthState();
      
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      // Create new user
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      if (!data.user) {
        throw new Error("Falha ao criar usuário.");
      }
      
      // Add user to admin_users table
      const { error: adminError } = await supabase
        .from('admin_users')
        .insert({
          id: data.user.id,
          email: data.user.email,
          is_super_admin: isFirstAdmin // First admin is super admin
        });
      
      if (adminError) throw adminError;
      
      // Call the stored function to ensure first user is admin (as a backup)
      if (isFirstAdmin) {
        await supabase.rpc('add_first_admin');
      }
      
      toast({
        title: "Cadastro realizado",
        description: isFirstAdmin 
          ? "Conta de super administrador criada com sucesso."
          : "Conta de administrador criada com sucesso. Entre para continuar.",
      });
      
      // If auto-confirmation is enabled, redirect to login page
      if (data.session) {
        navigate('/admin/cms');
      } else {
        toast({
          title: "Confirme seu email",
          description: "Verifique seu email para confirmar seu cadastro antes de fazer login.",
        });
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro durante o cadastro.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-ndti-800">NDTI Admin</CardTitle>
          <CardDescription>
            {isFirstAdmin 
              ? "Crie sua conta de super administrador para gerenciar o site"
              : "Entre para gerenciar o conteúdo do site"}
          </CardDescription>
        </CardHeader>

        <Tabs defaultValue={isFirstAdmin ? "signup" : "login"}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Cadastro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Senha</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar senha</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-gray-600 mt-4">
            {isFirstAdmin 
              ? "Este será o primeiro administrador do sistema com acesso total."
              : "Este é um acesso restrito para administradores do NDTI"}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Email de teste: ndti@gmail.com <br />
            Senha de teste: ndti123456
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
