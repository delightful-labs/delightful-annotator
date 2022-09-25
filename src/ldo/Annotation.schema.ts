import { Schema } from "shexj";

/**
 * =============================================================================
 * AnnotationSchema: ShexJ Schema for Annotation
 * =============================================================================
 */
export const AnnotationSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "http://www.w3.org/ns/oa#Annotation",
      type: "Shape",
      expression: {
        type: "EachOf",
        expressions: [
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/oa#id",
            valueExpr: {
              type: "NodeConstraint",
              nodeKind: "iri",
            },
            min: 0,
            max: 1,
          },
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/oa#bodyValue",
            valueExpr: {
              type: "NodeConstraint",
              datatype: "http://www.w3.org/2001/XMLSchema#string",
            },
            min: 0,
            max: 1,
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value:
                    "A plain text string to be used as the content of the body of the Annotation.",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/oa#canonical",
            valueExpr: {
              type: "NodeConstraint",
              nodeKind: "iri",
            },
            min: 0,
            max: 1,
            annotations: [
              {
                type: "Annotation",
                predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                object: {
                  value:
                    "The canonical IRI that can always be used to deduplicate the Annotation, regardless of the current IRI used to access the representation",
                },
              },
            ],
          },
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/oa#hasTarget",
            valueExpr: {
              type: "NodeConstraint",
              nodeKind: "iri",
            },
          },
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/oa#motivatedBy",
            valueExpr: {
              type: "NodeConstraint",
              values: [
                "http://www.w3.org/ns/oa#assessing",
                "http://www.w3.org/ns/oa#bookmarking",
                "http://www.w3.org/ns/oa#classifying",
                "http://www.w3.org/ns/oa#commenting",
                "http://www.w3.org/ns/oa#describing",
                "http://www.w3.org/ns/oa#editing",
                "http://www.w3.org/ns/oa#highlighting",
                "http://www.w3.org/ns/oa#identifying",
                "http://www.w3.org/ns/oa#linking",
                "http://www.w3.org/ns/oa#moderating",
                "http://www.w3.org/ns/oa#questioning",
                "http://www.w3.org/ns/oa#replying",
                "http://www.w3.org/ns/oa#tagging",
              ],
            },
            min: 0,
            max: 1,
          },
        ],
      },
    },
    {
      id: "http://www.w3.org/ns/oa#DataPositionSelector",
      type: "Shape",
      expression: {
        type: "EachOf",
        expressions: [
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/oa#start",
            valueExpr: {
              type: "NodeConstraint",
              datatype: "http://www.w3.org/2001/XMLSchema#nonNegativeInteger",
            },
            min: 1,
            max: 1,
          },
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/oa#end",
            valueExpr: {
              type: "NodeConstraint",
              datatype: "http://www.w3.org/2001/XMLSchema#nonNegativeInteger",
            },
            min: 1,
            max: 1,
          },
        ],
      },
    },
    {
      id: "http://www.w3.org/ns/oa#TimeState",
      type: "Shape",
      expression: {
        type: "EachOf",
        expressions: [
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/oa#cachedSource",
            valueExpr: {
              type: "NodeConstraint",
              nodeKind: "iri",
            },
          },
          {
            type: "TripleConstraint",
            predicate: "http://www.w3.org/ns/oa#sourceDate",
            valueExpr: {
              type: "NodeConstraint",
              datatype: "http://www.w3.org/2001/XMLSchema#dateTime",
            },
          },
        ],
      },
    },
  ],
};
