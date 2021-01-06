import { hackboxServer } from '../../../hackbox-server/dist/index.js';
import { gameReference } from './gameReference.js';

const port = process.env.PORT || 8080;
hackboxServer(port , gameReference);
