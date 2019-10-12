# typical

> Animated typing in ~400 bytes of JavaScript.

## Install

```javascript
import { type } from '@camwiegert/typical';
```

## API

```typescript
type(node: Node, text: string) => Promise<void>
```

## Features

- **Smart delete:** only deletes what it needs to
- **Humanity:** typing speed varies slightly
- **Promises:** returns a Promise resolved when typing finishes

## Support

- [x] Chrome
- [x] Edge
- [x] Firefox
- [x] Safari
- [ ] Internet Explorer
