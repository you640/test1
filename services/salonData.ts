import { UserProfile, SalonService, Stylist, Appointment, Product, GalleryItem } from '../types';

// --- MOCK DATA ---

const users: UserProfile[] = [
    { uid: 'user-1', name: 'Jana Nováková', email: 'jana.novakova@example.com', phone: '0901 123 456', loyaltyPoints: 150, isAdmin: false },
    { uid: 'user-2', name: 'Peter Čierny', email: 'peter.cierny@example.com', phone: '0902 987 654', loyaltyPoints: 80, isAdmin: false },
    { uid: 'admin-1', name: 'Admin PAPI', email: 'admin@papi.sk', loyaltyPoints: 0, isAdmin: true },
];

const services: SalonService[] = [
    { id: 's1', name: 'Dámsky strih', duration: 60, price: 45, category: 'Dámske' },
    { id: 's2', name: 'Pánsky strih', duration: 30, price: 25, category: 'Pánske' },
    { id: 's3', name: 'Farbenie Balayage', duration: 180, price: 120, category: 'Farbenie' },
    { id: 's4', name: 'Regeneračná kúra', duration: 30, price: 30, category: 'Ostatné' },
    { id: 's5', name: 'Fúkaná', duration: 45, price: 35, category: 'Dámske' },
    { id: 's6', name: 'Úprava brady', duration: 20, price: 15, category: 'Pánske' },
];

const stylists: Stylist[] = [
    { id: 'st1', name: 'Martin "Papi" Novotný', title: 'Master Stylist & Founder', imageUrl: 'https://i.pravatar.cc/300?u=st1', description: 'S viac ako 15 ročnou praxou, Papi je majstrom vo svojom obore.', services: ['s1', 's2', 's3', 's5', 's6'], skills: ['Balayage', 'Creative Cuts', 'Barbering'] },
    { id: 'st2', name: 'Lucia Veselá', title: 'Senior Colorist', imageUrl: 'https://i.pravatar.cc/300?u=st2', description: 'Lucia je expertka na farbenie a dokáže vytvoriť odtieň presne pre vás.', services: ['s1', 's3', 's4', 's5'], skills: ['Color Correction', 'Vivid Colors', 'Blonding'] },
    { id: 'st3', name: 'Tomáš Krátky', title: 'Stylist & Barber', imageUrl: 'https://i.pravatar.cc/300?u=st3', description: 'Tomáš sa špecializuje na moderné pánske strihy a úpravu brady.', services: ['s2', 's6'], skills: ['Fades', 'Beard Trimming', 'Classic Cuts'] },
    { id: 'st4', name: 'Eva Dlhá', title: 'Creative Stylist', imageUrl: 'https://i.pravatar.cc/300?u=st4', description: 'Eva miluje experimentovať s farbami a avantgardnými strihmi.', services: ['s1', 's3', 's5'], skills: ['Avant-garde', 'Pastel Colors', 'Updos'] },
    { id: 'st5', name: 'Michal Tichý', title: 'Junior Barber', imageUrl: 'https://i.pravatar.cc/300?u=st5', description: 'Michal je vychádzajúca hviezda v oblasti pánskych strihov a starostlivosti o bradu.', services: ['s2', 's6'], skills: ['Hot Towel Shave', 'Skin Fades'] },
    { id: 'st6', name: 'Zuzana Múdra', title: 'Hair Care Specialist', imageUrl: 'https://i.pravatar.cc/300?u=st6', description: 'Zuzana je expertka na zdravie vlasov a regeneračné kúry.', services: ['s4', 's5'], skills: ['Hair Treatments', 'Scalp Care', 'Styling'] },
];

let appointments: Appointment[] = [
    { id: 'a1', userId: 'user-1', stylistId: 'st2', serviceId: 's3', startTime: new Date('2024-08-10T14:00:00'), endTime: new Date('2024-08-10T17:00:00'), status: 'upcoming' },
    { id: 'a2', userId: 'user-2', stylistId: 'st3', serviceId: 's2', startTime: new Date('2024-08-11T10:00:00'), endTime: new Date('2024-08-11T10:30:00'), status: 'upcoming' },
    { id: 'a3', userId: 'user-1', stylistId: 'st1', serviceId: 's1', startTime: new Date('2024-07-15T16:00:00'), endTime: new Date('2024-07-15T17:00:00'), status: 'completed' },
];

const products: Product[] = [
    { id: 1, name: 'PAPI Signature Pomade', price: 22.50, imageUrl: 'https://picsum.photos/seed/p1/400/400', description: 'Silná fixácia s matným finišom pre dokonalý účes po celý deň.' },
    { id: 2, name: 'Hydratačný Šampón Gold', price: 18.00, imageUrl: 'https://picsum.photos/seed/p2/400/400', description: 'Vyživuje a hydratuje suché a poškodené vlasy.' },
    { id: 3, name: 'Olej na Bradu & Vlasy', price: 25.00, imageUrl: 'https://picsum.photos/seed/p3/400/400', description: 'Zmes prírodných olejov pre zdravú bradu a lesklé vlasy.' },
    { id: 4, name: 'Termoochranný Sprej', price: 19.90, imageUrl: 'https://picsum.photos/seed/p4/400/400', description: 'Chráni vlasy pred poškodením teplom pri fénovaní a žehlení.' },
    { id: 5, name: 'Objemový Púder', price: 17.50, imageUrl: 'https://picsum.photos/seed/p5/400/400', description: 'Okamžitý objem a textúra pre jemné vlasy.' },
    { id: 6, name: 'Lak na Vlasy s Leskom', price: 21.00, imageUrl: 'https://picsum.photos/seed/p6/400/400', description: 'Flexibilná fixácia so žiarivým leskom bez zaťaženia.' },
];

const galleryItems: GalleryItem[] = [
    { id: 1, title: 'Platinum Bob', category: 'Strihy', imageUrl: 'https://picsum.photos/seed/g1/400/600' },
    { id: 2, title: 'Sunset Balayage', category: 'Farbenie', imageUrl: 'https://picsum.photos/seed/g2/400/600' },
    { id: 3, title: 'Sharp Fade', category: 'Pánske', imageUrl: 'https://picsum.photos/seed/g3/400/600' },
    { id: 4, title: 'Vivid Copper', category: 'Farbenie', imageUrl: 'https://picsum.photos/seed/g4/400/600' },
    { id: 5, title: 'Long Layers', category: 'Strihy', imageUrl: 'https://picsum.photos/seed/g5/400/600' },
    { id: 6, title: 'Classic Pompadour', category: 'Pánske', imageUrl: 'https://picsum.photos/seed/g6/400/600' },
    { id: 7, title: 'Rose Gold Waves', category: 'Farbenie', imageUrl: 'https://picsum.photos/seed/g7/400/600' },
    { id: 8, title: 'Textured Crop', category: 'Pánske', imageUrl: 'https://picsum.photos/seed/g8/400/600' },
    { id: 9, title: 'Boho Braids', category: 'Styling', imageUrl: 'https://picsum.photos/seed/g9/400/600' },
    { id: 10, title: 'Icy Blonde', category: 'Farbenie', imageUrl: 'https://picsum.photos/seed/g10/400/600' },
    { id: 11, title: 'Shaggy Mullet', category: 'Strihy', imageUrl: 'https://picsum.photos/seed/g11/400/600' },
    { id: 12, title: 'Slick Back', category: 'Pánske', imageUrl: 'https://picsum.photos/seed/g12/400/600' },
];

// Simulate API latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

class SalonDataService {
    async getUsers(): Promise<UserProfile[]> { await delay(100); return [...users]; }
    async getServices(): Promise<SalonService[]> { await delay(100); return [...services]; }
    async getStylists(): Promise<Stylist[]> { await delay(100); return [...stylists]; }
    async getAppointments(): Promise<Appointment[]> { await delay(100); return [...appointments]; }
    async getProducts(): Promise<Product[]> { await delay(100); return [...products]; }
    async getGalleryItems(): Promise<GalleryItem[]> { await delay(100); return [...galleryItems]; }
    
    async getStylistsForService(serviceId: string): Promise<Stylist[]> {
        await delay(100);
        return stylists.filter(stylist => stylist.services.includes(serviceId));
    }

    async getUserAppointments(userId: string): Promise<Appointment[]> {
        await delay(100);
        return appointments.filter(appt => appt.userId === userId);
    }

    async createAppointment(data: Omit<Appointment, 'id' | 'endTime'>): Promise<Appointment> {
        await delay(300);
        const service = services.find(s => s.id === data.serviceId);
        const endTime = new Date(data.startTime.getTime() + (service?.duration || 60) * 60000);
        const newAppointment: Appointment = {
            ...data,
            id: `a${appointments.length + 1}`,
            endTime,
        };
        appointments.push(newAppointment);
        return newAppointment;
    }

    async cancelAppointment(appointmentId: string): Promise<void> {
        await delay(200);
        appointments = appointments.map(appt => 
            appt.id === appointmentId ? { ...appt, status: 'cancelled' } : appt
        );
    }
}

export const salonDataService = new SalonDataService();