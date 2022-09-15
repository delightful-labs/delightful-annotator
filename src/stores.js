import {
  Session,
} from '@inrupt/solid-client-authn-browser';
import { writable } from 'svelte/store';

let ses = new Session();

export const session = writable(ses);