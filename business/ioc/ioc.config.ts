import 'reflect-metadata';
import { Container } from 'inversify';
import { bindAuthenticationContainer } from './containers/authentication.container';
import { bindCategoryContainer } from './containers/category.container';
import { bindJobContainer } from './containers/job.container';
import { bindUserContainer } from './containers/user.container';

const container = new Container({ defaultScope: 'Singleton' });

bindAuthenticationContainer(container);
bindCategoryContainer(container);
bindJobContainer(container);
bindUserContainer(container);

export { container };
