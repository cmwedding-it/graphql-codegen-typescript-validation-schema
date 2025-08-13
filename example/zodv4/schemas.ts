import * as z from 'zod'
import { Admin, AttributeInput, ButtonComponentType, ComponentInput, DropDownComponentInput, EventArgumentInput, EventInput, EventOptionType, Guest, HttpInput, HttpMethod, LayoutInput, MyType, MyTypeFooArgs, Namer, PageInput, PageType, User } from '../types'

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const ButtonComponentTypeSchema = z.enum(ButtonComponentType);

export const EventOptionTypeSchema = z.enum(EventOptionType);

export const HttpMethodSchema = z.enum(HttpMethod);

export const PageTypeSchema = z.enum(PageType);

export function AdminSchema(): z.ZodObject<Properties<Admin>> {
  return z.object({
    __typename: z.literal('Admin').optional(),
    lastModifiedAt: definedNonNullAnySchema.nullable()
  })
}

export function AttributeInputSchema(): z.ZodObject<Properties<AttributeInput>> {
  return z.object({
    key: z.string().nullable(),
    val: z.string().nullable()
  })
}

export function ComponentInputSchema(): z.ZodObject<Properties<ComponentInput>> {
  return z.object({
    child: z.lazy(() => ComponentInputSchema().nullable()),
    childrens: z.array(z.lazy(() => ComponentInputSchema().nullable())).nullable(),
    event: z.lazy(() => EventInputSchema().nullable()),
    name: z.string(),
    type: ButtonComponentTypeSchema
  })
}

export function DropDownComponentInputSchema(): z.ZodObject<Properties<DropDownComponentInput>> {
  return z.object({
    dropdownComponent: z.lazy(() => ComponentInputSchema().nullable()),
    getEvent: z.lazy(() => EventInputSchema())
  })
}

export function EventArgumentInputSchema(): z.ZodObject<Properties<EventArgumentInput>> {
  return z.object({
    name: z.string().min(5),
    value: z.string().regex(/^foo/, "message")
  })
}

export function EventInputSchema(): z.ZodObject<Properties<EventInput>> {
  return z.object({
    arguments: z.array(z.lazy(() => EventArgumentInputSchema())),
    options: z.array(EventOptionTypeSchema).nullable()
  })
}

export function GuestSchema(): z.ZodObject<Properties<Guest>> {
  return z.object({
    __typename: z.literal('Guest').optional(),
    lastLoggedIn: definedNonNullAnySchema.nullable()
  })
}

export function HttpInputSchema(): z.ZodObject<Properties<HttpInput>> {
  return z.object({
    method: HttpMethodSchema.nullable(),
    url: definedNonNullAnySchema
  })
}

export function LayoutInputSchema(): z.ZodObject<Properties<LayoutInput>> {
  return z.object({
    dropdown: z.lazy(() => DropDownComponentInputSchema().nullable())
  })
}

export function MyTypeSchema(): z.ZodObject<Properties<MyType>> {
  return z.object({
    __typename: z.literal('MyType').optional(),
    foo: z.string().nullable()
  })
}

export function MyTypeFooArgsSchema(): z.ZodObject<Properties<MyTypeFooArgs>> {
  return z.object({
    a: z.string().nullable(),
    b: z.number(),
    c: z.boolean().nullable(),
    d: z.number()
  })
}

export function NamerSchema(): z.ZodObject<Properties<Namer>> {
  return z.object({
    name: z.string().nullable()
  })
}

export function PageInputSchema(): z.ZodObject<Properties<PageInput>> {
  return z.object({
    attributes: z.array(z.lazy(() => AttributeInputSchema())).nullable(),
    date: definedNonNullAnySchema.nullable(),
    height: z.number(),
    id: z.string(),
    layout: z.lazy(() => LayoutInputSchema()),
    pageType: PageTypeSchema,
    postIDs: z.array(z.string()).nullable(),
    show: z.boolean(),
    tags: z.array(z.string().nullable()).nullable(),
    title: z.string(),
    width: z.number()
  })
}

export function UserSchema(): z.ZodObject<Properties<User>> {
  return z.object({
    __typename: z.literal('User').optional(),
    createdAt: definedNonNullAnySchema.nullable(),
    email: z.string().nullable(),
    id: z.string().nullable(),
    kind: UserKindSchema().nullable(),
    name: z.string().nullable(),
    password: z.string().nullable(),
    updatedAt: definedNonNullAnySchema.nullable()
  })
}

export function UserKindSchema() {
  return z.union([AdminSchema(), GuestSchema()])
}
