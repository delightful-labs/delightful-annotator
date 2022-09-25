import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * AnnotationContext: JSONLD Context for Annotation
 * =============================================================================
 */
export const AnnotationContext: ContextDefinition = {
  id: {
    "@id": "http://www.w3.org/ns/oa#id",
  },
  bodyValue: {
    "@id": "http://www.w3.org/ns/oa#bodyValue",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  canonical: {
    "@id": "http://www.w3.org/ns/oa#canonical",
  },
  hasTarget: {
    "@id": "http://www.w3.org/ns/oa#hasTarget",
  },
  motivatedBy: {
    "@id": "http://www.w3.org/ns/oa#motivatedBy",
  },
  assessing: "http://www.w3.org/ns/oa#assessing",
  bookmarking: "http://www.w3.org/ns/oa#bookmarking",
  classifying: "http://www.w3.org/ns/oa#classifying",
  commenting: "http://www.w3.org/ns/oa#commenting",
  describing: "http://www.w3.org/ns/oa#describing",
  editing: "http://www.w3.org/ns/oa#editing",
  highlighting: "http://www.w3.org/ns/oa#highlighting",
  identifying: "http://www.w3.org/ns/oa#identifying",
  linking: "http://www.w3.org/ns/oa#linking",
  moderating: "http://www.w3.org/ns/oa#moderating",
  questioning: "http://www.w3.org/ns/oa#questioning",
  replying: "http://www.w3.org/ns/oa#replying",
  tagging: "http://www.w3.org/ns/oa#tagging",
  start: {
    "@id": "http://www.w3.org/ns/oa#start",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger",
  },
  end: {
    "@id": "http://www.w3.org/ns/oa#end",
    "@type": "http://www.w3.org/2001/XMLSchema#nonNegativeInteger",
  },
  cachedSource: {
    "@id": "http://www.w3.org/ns/oa#cachedSource",
  },
  sourceDate: {
    "@id": "http://www.w3.org/ns/oa#sourceDate",
    "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
  },
};
