import { ShapeType } from "ldo";
import { AnnotationSchema } from "./Annotation.schema";
import { AnnotationContext } from "./Annotation.context";
import {
  Annotation,
  DataPositionSelector,
  TimeState,
} from "./Annotation.typings";

/**
 * =============================================================================
 * LDO ShapeTypes Annotation
 * =============================================================================
 */

/**
 * Annotation ShapeType
 */
export const AnnotationShapeType: ShapeType<Annotation> = {
  schema: AnnotationSchema,
  shape: "http://www.w3.org/ns/oa#Annotation",
  context: AnnotationContext,
};

/**
 * DataPositionSelector ShapeType
 */
export const DataPositionSelectorShapeType: ShapeType<DataPositionSelector> = {
  schema: AnnotationSchema,
  shape: "http://www.w3.org/ns/oa#DataPositionSelector",
  context: AnnotationContext,
};

/**
 * TimeState ShapeType
 */
export const TimeStateShapeType: ShapeType<TimeState> = {
  schema: AnnotationSchema,
  shape: "http://www.w3.org/ns/oa#TimeState",
  context: AnnotationContext,
};
