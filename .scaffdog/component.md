---
name: 'component'
root: '.'
output: '.'
questions:
  dir:
      message: 'Please enter a component dir.'
      choices:
        - "ui"
        - "features"
  feature:
    if: contains(inputs.dir, 'features')
    message: 'Please enter a component feature'
  name: 'Please enter a component name.'
  story:
    confirm: 'Do you need a story?'
    initial: true
---

# `src/{{ inputs.dir | camel }}//{{ inputs.dir == "features" ? inputs.feature : null }}/{{ inputs.dir == "features" ? "components" : null }}/{{ inputs.name | pascal }}/index.ts`

```typescript
export * from './{{ inputs.name }}';
```

# `src/{{ inputs.dir | camel }}/{{ inputs.dir == "features" ? inputs.feature : null }}/{{ inputs.dir == "features" ? "components" : null }}/{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```typescript
import type { FC } from 'react';

export type Props = {};

export const {{ inputs.name | pascal }}: FC<Props> = ({}) => {
    return <></>;
};

```

# `{{ !inputs.story && '!' }}src/{{ inputs.dir | camel }}//{{ inputs.dir == "features" ? inputs.feature : null }}/{{ inputs.dir == "features" ? "components" : null }}/{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.stories.tsx`

```typescript
import { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}';

export default { component: {{ inputs.name | pascal }} };
export const Overview = { args: {} };
```