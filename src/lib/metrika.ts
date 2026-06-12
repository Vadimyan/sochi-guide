// Shared between the server layout (noscript pixel) and the client
// YandexMetrika component. Must NOT live in a 'use client' module:
// values imported from one into a server component become client
// references, not real values.
export const METRIKA_COUNTER_ID = 109803284;
