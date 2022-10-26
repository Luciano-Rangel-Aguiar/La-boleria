CREATE DATABASE boleria;

CREATE TABLE "cakes" (
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT null,
	price numeric NOT null,
	image VARCHAR not null,
	description text not null
);

CREATE TABLE "clients" (
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT null,
	address VARCHAR NOT null,
	phone VARCHAR NOT null
);

CREATE TABLE "orders" (
	id SERIAL PRIMARY KEY,
	"clientId" integer REFERENCES "clients"("id") NOT null,
	"cakeId" integer REFERENCES "cakes"("id") NOT null,
	quantity integer NOT null,
	"createdAt" timestamp default Now() not null,
	"totalPrice" numeric not null
);