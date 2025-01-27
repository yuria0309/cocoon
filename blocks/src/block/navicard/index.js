/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import { THEME_NAME } from '../../helpers';
import { __ } from '@wordpress/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';
import metadata from './block.json';

const { name } = metadata;
export { metadata, name };

export const settings = {
  title: __( 'ナビカード', THEME_NAME ),
  icon: <FontAwesomeIcon icon={ [ 'fas', 'bars' ] } />,
  description: __( '登録されているメニューからナビカードを表示します。', THEME_NAME ),

  edit,
  save,
  deprecated,
  transforms,
};