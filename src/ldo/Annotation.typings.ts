import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for Annotation
 * =============================================================================
 */

/**
 * Annotation Type
 */
export interface Annotation {
  "@id"?: string;
  "@context"?: ContextDefinition;
  id?: string;
  /**
   * A plain text string to be used as the content of the body of the Annotation.
   */
  bodyValue?: string;
  /**
   * The canonical IRI that can always be used to deduplicate the Annotation, regardless of the current IRI used to access the representation
   */
  canonical?: string;
  hasTarget: string;
  motivatedBy?:
    | "assessing"
    | "bookmarking"
    | "classifying"
    | "commenting"
    | "describing"
    | "editing"
    | "highlighting"
    | "identifying"
    | "linking"
    | "moderating"
    | "questioning"
    | "replying"
    | "tagging";
}

/**
 * DataPositionSelector Type
 */
export interface DataPositionSelector {
  "@id"?: string;
  "@context"?: ContextDefinition;
  start: number;
  end: number;
}

/**
 * TimeState Type
 */
export interface TimeState {
  "@id"?: string;
  "@context"?: ContextDefinition;
  cachedSource: string;
  sourceDate: string;
}
