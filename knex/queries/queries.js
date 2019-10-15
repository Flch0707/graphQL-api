const knex = require("../knex")

//GET
function getUsers(filters) {
  return knex("users")
    .select("*")
    .where(filters)
}
function getCategories(filters) {
  return knex("categories")
    .select("*")
    .where(filters)
}
function getAlcohols(filters) {
  return knex("alcohols")
    .select("*")
    .where(filters)
}
function getTypes(filters) {
  return knex("types")
    .select("*")
    .where(filters)
}
function getBottles(filters) {
  return knex("bottles")
    .select("*")
    .where(filters)
}

//ADD
function addUser(user) {
  return knex("users")
    .insert({
      email: user.email,
      password: user.password,
      role: user.role || "GUEST"
    })
    .returning("*")
}

function addCategory(cat) {
  return knex("categories")
    .insert({
      id: cat.id,
      name: cat.name
    })
    .returning("*")
}

function addAlcohol(alc) {
  return knex("alcohols")
    .insert({
      id: alc.id,
      name: alc.name,
      category: alc.category
    })
    .returning("*")
}

function addType(type) {
  return knex("types")
    .insert({
      id: type.id,
      name: type.name,
      alcohol: type.alcohol
    })
    .returning("*")
}

function addBottle(bot) {
  return knex("bottles")
    .insert({
      id: bot.id,
      name: bot.name,
      alcohol_volume: bot.alcohol_volume,
      format: bot.format,
      price: bot.price,
      URL: bot.URL || null,
      rate: bot.rate || 0,
      empty: bot.empty || false,
      category: bot.category,
      type: bot.type,
      alcohol: bot.alcohol
    })
    .returning("*")
}

//UPDATE
function updateUser(user) {
  const tmpUser = {}
  if (user.name) tmpUser.name = user.name
  if (user.email) tmpUser.email = user.email
  if (user.password) tmpUser.password = user.password
  if (user.role) tmpUser.role = user.role
  return knex("users")
    .where("id", user.id)
    .update(tmpUser)
    .returning("*")
}

function updateCategory(cat) {
    const tmpCategory = {}
    if (cat.name) tmpCategory.name = cat.name
    return knex("categories")
    .where("id", cat.id)
    .update(tmpCategory)
    .returning("*")
}

function updateAlcohol(alc) {
    const tmpAlcohol = {}
    if (alc.name) tmpAlcohol.name = alc.name
    if(alc.category) tmpAlcohol.category= alc.category
    return knex("alcohols")
    .where("id", alc.id)
    .update(tmpAlcohol)
    .returning("*")
}

function updateType(type) {
    const tmpType = {}
    if (type.name) tmpType.name = type.name
    if(type.alcohol) tmpType.alcohol= type.alcohol
    return knex("types")
    .where("id", type.id)
    .update(tmpType)
    .returning("*")
}

function updateBottle(bot) {
    const tmpBottle = {}
    if (bot.name) tmpBottle.name = bot.name
    if(bot.alcohol_volume) tmpBottle.alcohol_volume = bot.alcohol_volume
    if(bot.alcohol) tmpBottle.alcohol= bot.alcohol
    if(bot.format) tmpBottle.format = bot.format
    if(bot.price) tmpBottle.price=bot.price
    if(bot.URL) tmpBottle.URL = bot.URL
    if(bot.rate) tmpBottle.rate = bot.rate
    if (bot.empty) tmpBottle.empty =bot.empty
    if(bot.category) tmpBottle.category = bot.category
    if(bot.type) tmpBottle.type = bot.type
    if(bot.alcohol) tmpBottle.alcohol = bot.alcohol
    return knex("bottles")
    .where("id", bot.id)
    .update(tmpBottle)
    .returning("*");
}

//DELETE
 function deleteUser(user){
     return knex('users')
     .where('id',user.id)
     .del()
     .returning("*")
 }
 function deleteCategory(cat){
    return knex('categories')
    .where('id',cat.id)
    .del()
    .returning("*")
}
function deleteAlcohol(alc){
    return knex('alcohols')
    .where('id',alc.id)
    .del()
    .returning("*")
}
function deleteType(type){
    return knex('types')
    .where('id',type.id)
    .del()
    .returning("*")
}
function deleteBottle(bot){
    return knex('bottles')
    .where('id',bot.id)
    .del()
    .returning("*")
}

module.exports ={
    getUsers,
    getCategories,
    getAlcohols,
    getTypes,
    getBottles,
    addUser,
    addCategory,
    addAlcohol,
    addType,
    addBottle,
    updateUser,
    updateCategory,
    updateAlcohol,
    updateType,
    updateBottle,
    deleteUser,
    deleteCategory,
    deleteAlcohol,
    deleteType,
    deleteBottle
}


