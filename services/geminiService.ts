
import { GoogleGenAI, GenerateContentResponse, Type } from '@google/genai';
import { SalonService, ContentIdea } from '../types';

class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    } else {
      console.error("API key for Gemini is not set. AI features will be disabled.");
    }
  }

  async getAddonServiceSuggestion(selectedService: SalonService, allServices: SalonService[]): Promise<string> {
    if (!this.ai) {
      return 'Pre extra lesk a ochranu odporúčame regeneračnú kúru.'; // Fallback
    }

    try {
      const otherServices = allServices
        .filter(s => s.id !== selectedService.id)
        .map(s => `- ${s.name} (${s.price.toFixed(2)} €)`)
        .join('\n');
      
      const prompt = `Klient si vybral službu: "${selectedService.name}". Navrhni mu jednu vhodnú doplnkovú službu z tohto zoznamu, ktorá by sa k tomu hodila. Odpovedz jednou krátkou, pútavou marketingovou vetou v slovenčine.\n\nZoznam dostupných služieb:\n${otherServices}`;
      
      const response = await this.ai.models.generateContent({ 
        model: 'gemini-2.5-flash', 
        contents: prompt 
      });

      return response.text.trim();
    } catch (error) {
      console.error('Error getting addon suggestion:', error);
      return 'Pre extra lesk a ochranu odporúčame regeneračnú kúru.'; // Fallback on error
    }
  }

  async generateContentIdeas(topic: string): Promise<ContentIdea[]> {
    if (!this.ai) {
      throw new Error('Gemini AI client is not initialized.');
    }

    try {
        const response = await this.ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Vygeneruj 3 nápady na obsah pre sociálne siete kaderníckeho salónu na tému "${topic}". Pre každý nápad uveď titulok, stručný popis, platformu (Instagram, TikTok, alebo Facebook) a 3 relevantné hashtagy.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            platform: { type: Type.STRING, enum: ['Instagram', 'TikTok', 'Facebook'] },
                            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                        },
                        required: ["title", "description", "platform", "hashtags"],
                    },
                },
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error('Error generating content ideas:', error);
        // Return mock data on error
        return [
            { title: 'Ukážka Balayage', description: 'Krátke video transformácie vlasov.', platform: 'Instagram', hashtags: ['#balayage', '#papisalon', '#vlasy'] },
            { title: 'Tip dňa od stylistu', description: 'Rýchly tip na domácu starostlivosť o vlasy.', platform: 'TikTok', hashtags: ['#hairtip', '#kadernik', '#starostlivost'] },
            { title: 'Predstavujeme produkt týždňa', description: 'Detailný príspevok o PAPI Signature Pomade.', platform: 'Facebook', hashtags: ['#papi', '#produkt', '#pomada'] },
        ];
    }
  }
}

export const geminiService = new GeminiService();
