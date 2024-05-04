import Alpine from 'alpinejs';

import App from './app.class';

Alpine.data('app', () => new App());

Alpine.start();
