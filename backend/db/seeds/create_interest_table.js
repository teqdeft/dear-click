/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('interests').del()
  await knex('interests').insert([
    { id: 1, name: 'Music', created_at: new Date(), updated_at: new Date() },
    { id: 2, name: 'Fashion', created_at: new Date(), updated_at: new Date() },
    { id: 3, name: 'Games', created_at: new Date(), updated_at: new Date() },
    { id: 4, name: 'Pet', created_at: new Date(), updated_at: new Date() },
    { id: 5, name: 'Travelling', created_at: new Date(), updated_at: new Date() },
    { id: 6, name: 'Technology', created_at: new Date(), updated_at: new Date() },
    { id: 7, name: 'Beauty', created_at: new Date(), updated_at: new Date() },
    { id: 8, name: 'Food', created_at: new Date(), updated_at: new Date() },
    { id: 9, name: 'Comedy', created_at: new Date(), updated_at: new Date() },
    { id: 10, name: 'Skincare', created_at: new Date(), updated_at: new Date() },
    { id: 11, name: 'Wellness', created_at: new Date(), updated_at: new Date() },
    { id: 12, name: 'Bag', created_at: new Date(), updated_at: new Date() },
    { id: 13, name: 'Accessories', created_at: new Date(), updated_at: new Date() },
    { id: 14, name: 'sports', created_at: new Date(), updated_at: new Date() },
  ]);
};
