import { createMoon } from 'astronomy-bundle/moon';
import {
  createJupiter,
  createMars,
  createMercury,
  createNeptune,
  createSaturn,
  createUranus,
  createVenus
  } from 'astronomy-bundle/planets';
import { createSun } from 'astronomy-bundle/sun';
import { SolarSystemObject } from '#layer-solar-system/model/solar-system-object';


const sun: SolarSystemObject = {
  name: 'Sun',
  pathSteps: 365,
  bundleCreator: createSun
};

const moon: SolarSystemObject = {
  name: 'Moon',
  pathSteps: 28,
  bundleCreator: createMoon
};

const mercury: SolarSystemObject = {
  name: 'Mercury',
  pathSteps: 7,
  bundleCreator: createMercury
};

const venus: SolarSystemObject = {
  name: 'Venus',
  pathSteps: 7,
  bundleCreator: createVenus
};

const mars: SolarSystemObject = {
  name: 'Mars',
  pathSteps: 14,
  bundleCreator: createMars
};

const jupiter: SolarSystemObject = {
  name: 'Jupiter',
  pathSteps: 30,
  bundleCreator: createJupiter
};

const saturn: SolarSystemObject = {
  name: 'Saturn',
  pathSteps: 30,
  bundleCreator: createSaturn
};

const uranus: SolarSystemObject = {
  name: 'Uranus',
  pathSteps: 30,
  bundleCreator: createUranus
};

const neptune: SolarSystemObject = {
  name: 'Neptune',
  pathSteps: 30,
  bundleCreator: createNeptune
};

/**
 * Contains the references of all supported objects of the Solar system layer.
 */
export const SOLAR_SYSTEM_OBJECTS: Array<SolarSystemObject> = [
  sun,
  moon,
  mercury,
  venus,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune
];
