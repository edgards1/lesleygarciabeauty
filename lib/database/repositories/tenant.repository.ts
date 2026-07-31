import { getDb, initModels } from "../connection";
import { Business } from "../models/index";

export async function findBySlug(slug: string) {
  const db = getDb();
  initModels(db);
  return Business.findOne({ where: { slug } });
}

export async function findByAgendamientoSlug(slugAgendamiento: string) {
  const db = getDb();
  initModels(db);
  return Business.findOne({ where: { slugAgendamiento }, raw: true });
}

export async function findById(businessId: string) {
  const db = getDb();
  initModels(db);
  return Business.findByPk(businessId, { raw: true });
}
