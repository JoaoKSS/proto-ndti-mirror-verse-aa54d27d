
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type ContentItem = {
  id: string;
  page: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
};

interface ContentEditFormProps {
  item: ContentItem;
  onSave: (item: ContentItem) => void;
  onCancel: () => void;
}

const ContentEditForm = ({ item, onSave, onCancel }: ContentEditFormProps) => {
  const [formData, setFormData] = useState<ContentItem>(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="page">Página</Label>
          <Input
            id="page"
            name="page"
            value={formData.page}
            onChange={handleChange}
            required
            placeholder="Ex: home, about, services"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="section">Seção</Label>
          <Input
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
            placeholder="Ex: hero, about, services"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          placeholder="Título da seção"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtítulo</Label>
        <Input
          id="subtitle"
          name="subtitle"
          value={formData.subtitle || ''}
          onChange={handleChange}
          placeholder="Subtítulo ou descrição curta"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content || ''}
          onChange={handleChange}
          placeholder="Conteúdo principal"
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image_url">URL da Imagem</Label>
        <Input
          id="image_url"
          name="image_url"
          value={formData.image_url || ''}
          onChange={handleChange}
          placeholder="https://exemplo.com/imagem.jpg"
        />
        {formData.image_url && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-2">Pré-visualização:</p>
            <img 
              src={formData.image_url} 
              alt="Preview" 
              className="h-40 w-auto object-cover rounded border" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
              }}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default ContentEditForm;
