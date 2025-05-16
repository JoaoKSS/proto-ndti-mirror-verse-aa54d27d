
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import ContentEditForm from '@/components/ContentEditForm';
import useAuth from '@/hooks/useAuth';

type ContentItem = {
  id: string;
  page: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
};

const AdminCMS = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<ContentItem | null>(null);
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  
  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('page')
        .order('section');
      
      if (error) throw error;
      setContents(data as ContentItem[]);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar conteúdo",
        description: error.message || "Não foi possível carregar o conteúdo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleAddNew = () => {
    setEditItem({
      id: '',
      page: '',
      section: '',
      title: '',
      subtitle: '',
      content: '',
      image_url: '',
    });
  };

  const handleSave = async (item: ContentItem) => {
    try {
      let result;
      
      if (item.id) {
        // Update existing item
        result = await supabase
          .from('page_content')
          .update({
            page: item.page,
            section: item.section,
            title: item.title,
            subtitle: item.subtitle,
            content: item.content,
            image_url: item.image_url,
            updated_at: new Date().toISOString(),
          })
          .eq('id', item.id);
      } else {
        // Add new item
        result = await supabase
          .from('page_content')
          .insert({
            page: item.page,
            section: item.section,
            title: item.title,
            subtitle: item.subtitle,
            content: item.content,
            image_url: item.image_url,
          });
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: "Sucesso",
        description: item.id ? "Conteúdo atualizado com sucesso!" : "Novo conteúdo adicionado com sucesso!",
      });
      
      setEditItem(null);
      fetchContents();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message || "Não foi possível salvar o conteúdo.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('page_content')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Excluído com sucesso",
        description: "O item foi removido.",
      });
      
      fetchContents();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.message || "Não foi possível excluir o conteúdo.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="text-center py-10">Carregando conteúdo...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciador de Conteúdo</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Logado como: {user?.email}
          </span>
          <Button variant="outline" onClick={handleLogout}>Sair</Button>
        </div>
      </div>

      {editItem ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editItem.id ? 'Editar Conteúdo' : 'Adicionar Novo Conteúdo'}
          </h2>
          <ContentEditForm 
            item={editItem} 
            onSave={handleSave} 
            onCancel={() => setEditItem(null)} 
          />
        </div>
      ) : (
        <>
          <div className="mb-4">
            <Button onClick={handleAddNew}>Adicionar Novo Conteúdo</Button>
          </div>
          
          <Tabs defaultValue="home">
            <TabsList className="mb-4">
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="all">Todos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="home">
              <ContentTable 
                contents={contents.filter(item => item.page === 'home')}
                onEdit={setEditItem}
                onDelete={handleDelete}
              />
            </TabsContent>
            
            <TabsContent value="all">
              <ContentTable 
                contents={contents}
                onEdit={setEditItem}
                onDelete={handleDelete}
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

type ContentTableProps = {
  contents: ContentItem[];
  onEdit: (item: ContentItem) => void;
  onDelete: (id: string) => void;
};

const ContentTable = ({ contents, onEdit, onDelete }: ContentTableProps) => {
  if (contents.length === 0) {
    return <div className="text-center py-6">Nenhum conteúdo encontrado.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Página</TableHead>
          <TableHead>Seção</TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Subtítulo</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contents.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.page}</TableCell>
            <TableCell>{item.section}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.subtitle ? item.subtitle.substring(0, 50) + (item.subtitle.length > 50 ? '...' : '') : ''}</TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                Editar
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminCMS;
