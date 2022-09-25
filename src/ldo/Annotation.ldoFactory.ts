import { LdoFactory } from "ldo";
import {
  AnnotationShapeType,
  DataPositionSelectorShapeType,
  TimeStateShapeType,
} from "./Annotation.shapeTypes";

/**
 * =============================================================================
 * LDO Factories for Annotation
 * =============================================================================
 */

/**
 * Annotation LdoFactory
 */
export const AnnotationFactory = new LdoFactory(AnnotationShapeType);

/**
 * DataPositionSelector LdoFactory
 */
export const DataPositionSelectorFactory = new LdoFactory(
  DataPositionSelectorShapeType
);

/**
 * TimeState LdoFactory
 */
export const TimeStateFactory = new LdoFactory(TimeStateShapeType);
