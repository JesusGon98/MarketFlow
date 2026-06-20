import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const storeId = process.env.DEFAULT_STORE_ID ?? '1';

  const storeData = {
    name: 'Marketflow',
    logoUrl: '/MarketFlow.png',
    phone: '+52 55 1234 5678',
    email: 'contacto@marketflow.com',
    address: 'Av. Siempre Viva 123, CDMX',
    schedule: 'Lun - Sáb: 9:00 - 19:00',
    primaryColor: '#0d6efd',
    secondaryColor: '#6c757d',
    facebookUrl: 'https://facebook.com/marketflow',
    instagramUrl: 'https://instagram.com/marketflow',
    tiktokUrl: 'https://tiktok.com/@marketflow',
    whatsappUrl: 'https://wa.me/525512345678',
  };

  const store = await prisma.store.upsert({
    where: { id: storeId },
    update: storeData,
    create: { id: storeId, ...storeData },
  });

  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@marketflow.com' },
    update: {},
    create: {
      storeId: store.id,
      name: 'Administrador',
      email: 'admin@marketflow.com',
      passwordHash,
      role: 'admin',
    },
  });

  const categoriesData = [
    { name: 'Electrónica', description: 'Dispositivos y accesorios electrónicos' },
    { name: 'Ropa', description: 'Ropa para toda la familia' },
    { name: 'Hogar', description: 'Artículos para el hogar' },
    { name: 'Papelería', description: 'Artículos escolares y de oficina' },
  ];

  const categories = [];

  for (const data of categoriesData) {
    const category = await prisma.category.findFirst({ where: { storeId: store.id, name: data.name } });

    categories.push(
      category ??
        (await prisma.category.create({
          data: { ...data, storeId: store.id },
        })),
    );
  }

  const productsData = [
    { name: 'Audífonos Bluetooth', description: 'Audífonos inalámbricos con cancelación de ruido', price: 499.99, stock: 25, categoryIndex: 0, imageUrl: 'https://placehold.co/400x400?text=Audifonos' },
    { name: 'Cargador USB-C 20W', description: 'Cargador rápido compatible con la mayoría de dispositivos', price: 199.5, stock: 40, categoryIndex: 0, imageUrl: 'https://placehold.co/400x400?text=Cargador' },
    { name: 'Smartwatch Deportivo', description: 'Reloj inteligente con monitor de frecuencia cardiaca', price: 899.0, stock: 10, categoryIndex: 0, imageUrl: 'https://placehold.co/400x400?text=Smartwatch' },
    { name: 'Playera Básica', description: 'Playera de algodón 100%, varios colores', price: 149.0, stock: 60, categoryIndex: 1, imageUrl: 'https://placehold.co/400x400?text=Playera' },
    { name: 'Chamarra Impermeable', description: 'Chamarra ligera resistente al agua', price: 599.0, stock: 15, categoryIndex: 1, imageUrl: 'https://placehold.co/400x400?text=Chamarra' },
    { name: 'Pants Deportivo', description: 'Pants cómodo para uso diario', price: 349.0, stock: 0, categoryIndex: 1, imageUrl: 'https://placehold.co/400x400?text=Pants' },
    { name: 'Set de Sartenes', description: 'Set de 3 sartenes antiadherentes', price: 749.0, stock: 12, categoryIndex: 2, imageUrl: 'https://placehold.co/400x400?text=Sartenes' },
    { name: 'Lámpara LED de Escritorio', description: 'Lámpara recargable con 3 niveles de intensidad', price: 259.0, stock: 30, categoryIndex: 2, imageUrl: 'https://placehold.co/400x400?text=Lampara' },
    { name: 'Cuaderno Profesional', description: 'Cuaderno de 100 hojas, cuadrícula grande', price: 39.0, stock: 100, categoryIndex: 3, imageUrl: 'https://placehold.co/400x400?text=Cuaderno' },
    { name: 'Set de Plumas', description: 'Set de 12 plumas de colores', price: 79.0, stock: 50, categoryIndex: 3, imageUrl: 'https://placehold.co/400x400?text=Plumas' },
  ];

  for (const { categoryIndex, ...data } of productsData) {
    const exists = await prisma.product.findFirst({ where: { storeId: store.id, name: data.name } });

    if (!exists) {
      await prisma.product.create({
        data: { ...data, storeId: store.id, categoryId: categories[categoryIndex].id },
      });
    }
  }

  const bannersData = [
    { title: 'Liquidación de Verano', imageUrl: 'https://placehold.co/1200x400?text=Liquidacion+de+Verano', displayOrder: 1 },
    { title: 'Nuevos Ingresos', imageUrl: 'https://placehold.co/1200x400?text=Nuevos+Ingresos', displayOrder: 2 },
    { title: 'Envíos Gratis', imageUrl: 'https://placehold.co/1200x400?text=Envios+Gratis', displayOrder: 3 },
  ];

  for (const data of bannersData) {
    const exists = await prisma.banner.findFirst({ where: { storeId: store.id, title: data.title } });

    if (!exists) {
      await prisma.banner.create({ data: { ...data, storeId: store.id } });
    }
  }

  console.log('Seed completed successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
