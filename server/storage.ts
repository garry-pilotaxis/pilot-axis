import { type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

class MemoryStorage implements IStorage {
  private contacts: Contact[] = [];
  private nextId = 1;

  async createContact(contact: InsertContact): Promise<Contact> {
    const record: Contact = {
      id: this.nextId++,
      createdAt: new Date(),
      name: contact.name,
      business: contact.business ?? null,
      email: contact.email,
      phone: contact.phone ?? null,
      message: contact.message,
      preferredDate: contact.preferredDate ?? null,
    };
    this.contacts.push(record);
    return record;
  }

  async getContacts(): Promise<Contact[]> {
    return [...this.contacts].reverse();
  }
}

export const storage = new MemoryStorage();
