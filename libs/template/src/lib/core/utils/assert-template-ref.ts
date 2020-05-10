import { TemplateRef, ɵstringify as stringify } from '@angular/core';

export function assertTemplate(
  property: string,
  templateRef: TemplateRef<any> | null
): void {
  const isTemplateRefOrNull = !!(
    !templateRef || templateRef.createEmbeddedView
  );
  if (!isTemplateRefOrNull) {
    throw new Error(
      `${property} must be a TemplateRef, but received '${stringify(
        templateRef
      )}'.`
    );
  }
}
