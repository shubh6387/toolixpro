import { Injectable, signal } from '@angular/core';
import { TOOL_REGISTRY, CATEGORIES } from '../../features/tools/tool-registry.config';
import { ToolConfig } from '../../shared/models/tool-config.model';

@Injectable({
  providedIn: 'root'
})
export class ToolRegistryService {
  private toolsSignal = signal<ToolConfig[]>(TOOL_REGISTRY);
  private categoriesSignal = signal<{ name: string; iconClass: string }[]>(CATEGORIES);

  getTools() {
    return this.toolsSignal;
  }

  getCategories() {
    return this.categoriesSignal;
  }

  getPopularTools() {
    return signal(this.toolsSignal().filter(t => t.popular));
  }

  getToolsByCategory(category: string) {
    return signal(this.toolsSignal().filter(t => t.category === category));
  }

  getToolBySlug(slug: string): ToolConfig | undefined {
    return this.toolsSignal().find(t => t.slug === slug);
  }

  searchTools(query: string): ToolConfig[] {
    if (!query || query.trim() === '') {
      return [];
    }
    const cleanQuery = query.toLowerCase().trim();
    return this.toolsSignal().filter(t => 
      t.name.toLowerCase().includes(cleanQuery) ||
      t.tagline.toLowerCase().includes(cleanQuery) ||
      t.description.toLowerCase().includes(cleanQuery) ||
      t.category.toLowerCase().includes(cleanQuery) ||
      t.keywords.some(k => k.toLowerCase().includes(cleanQuery))
    );
  }
}
