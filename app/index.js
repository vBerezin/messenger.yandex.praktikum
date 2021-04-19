import './index.scss';
import { App } from '~common/scripts/app';
import { Router } from '~common/scripts/utils/router';
import { page500 } from '~blocks/page-500';
import { page404 } from '~blocks/page-404';
import { pageAuth } from '~blocks/page-auth';
import { pageChats } from '~blocks/page-chats';

const router = new Router();

router.add('/', () => App.render(pageAuth));
router.add('/500', () => App.render(page500));
router.add('/404', () => App.render(page404));
router.add('/chats', () => App.render(pageChats));
