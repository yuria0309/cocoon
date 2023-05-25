import { addFilter } from '@wordpress/hooks';
import { useDebounce, createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useState } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import classnames from 'classnames';
import { THEME_NAME } from '../../helpers';

// 拡張対象ブロック
const allowedBlocks = [ 'core/paragraph' ];

// custom attributesの追加
function addCustomAttributes( settings ) {
  if ( allowedBlocks.includes( settings.name ) ) {
    settings.attributes = Object.assign( settings.attributes, {
      extraStyle: {
        type: 'string',
        default: '',
      },
      extraBorder: {
        type: 'string',
        default: '',
      },
    } );
  }
  return settings;
}
addFilter(
  'blocks.registerBlockType',
  'cocoon-blocks/style-custom-attributes',
  addCustomAttributes
);

// Edit拡張
const addCustomEdit = createHigherOrderComponent( ( BlockEdit ) => {
  return ( props ) => {
    if ( allowedBlocks.includes( props.name ) && props.isSelected ) {
      const { setAttributes, isSelected, attributes } = props;
      const { className, extraStyle, extraBorder } = attributes;

      const extraStyles = [
        {
          style: '',
          buttonText: __( 'デフォルト', THEME_NAME ),
        },
        {
          style: 'p-style-01',
          buttonText: __( 'ストライプ', THEME_NAME ),
        },
        {
          style: 'p-style-02',
          buttonText: __( '方眼', THEME_NAME ),
        },
        {
          style: 'p-style-03',
          buttonText: __( '角に折り目', THEME_NAME ),
        },
        {
          style: 'p-style-04',
          buttonText: __( 'スティッチ', THEME_NAME ),
        },
        {
          style: 'p-style-05',
          buttonText: __( 'かぎ括弧', THEME_NAME ),
        },
        {
          style: 'p-style-06',
          buttonText: __( 'かぎ括弧(大)', THEME_NAME ),
        },
      ];

      const extraBorders = [
        {
          style: '',
          buttonText: __( 'デフォルト', THEME_NAME ),
        },
        {
          style: 'border-solid',
          buttonText: __( '実線', THEME_NAME ),
        },
        {
          style: 'border-double',
          buttonText: __( '二重線', THEME_NAME ),
        },
        {
          style: 'border-dashed',
          buttonText: __( 'ダッシュ', THEME_NAME ),
        },
        {
          style: 'border-dotted',
          buttonText: __( 'ドット', THEME_NAME ),
        },
      ];

      var index = 0;
      return (
        <Fragment>
          <BlockEdit { ...props } />

          { isSelected && (
            <InspectorControls>
              <PanelBody
                title={ __( '[C] ボーダー設定', THEME_NAME ) }
                initialOpen={ false }
              >
                <div className="block-editor-block-styles">
                  <div className="block-editor-block-styles__variants style-buttons">
                    {extraBorders.map((border) => {
                      index++;
                      return (
                        <div class="__btnBox">
                          <Button
                            id={ 'cocoon-dorder-button-' + index }
                            className={ classnames(
                              'display-none',
                              'block-editor-block-styles__item',
                              {
                                'is-active': border.style === extraBorder,
                              }
                            ) }
                            variant="secondary"
                            label={ border.buttonText }
                            onClick={ () =>
                              setAttributes( { extraBorder: border.style } )
                            }
                          ></Button>
                          <label
                            for={ 'cocoon-dorder-button-' + index }
                            class="__labelBtn"
                            data-selected={
                              border.style === extraBorder ? true : false
                            }
                          >
                            <span class="__prevWrap editor-styles-wrapper">
                              <span
                                className={ classnames( '__prev', {
                                  [ 'is-style-' + border.style ]:
                                    !! border.style,
                                  [ 'has-border' ]: border.style,
                                } ) }
                              ></span>
                            </span>
                            <span class="__prevTitle">
                              { border.buttonText }
                            </span>
                          </label>
                        </div>
                      );
                    } ) }
                  </div>
                </div>
              </PanelBody>
              <PanelBody
                title={ __( '[C] スタイル', THEME_NAME ) }
                initialOpen={ false }
              >
                <div className="block-editor-block-styles">
                  <div className="block-editor-block-styles__variants style-buttons">
                    {extraStyles.map((style) => {
                      index++
                      return (
                        <div class="__btnBox">
                          <Button
                            id={ 'cocoon-dorder-button-' + index }
                            className={ classnames(
                              'display-none',
                              'block-editor-block-styles__item',
                              {
                                'is-active': style.style === extraStyle,
                              }
                            ) }
                            variant="secondary"
                            label={ style.buttonText }
                            onClick={ () =>
                              setAttributes( { extraStyle: style.style } )
                            }
                          ></Button>
                          <label
                            for={ 'cocoon-dorder-button-' + index }
                            class="__labelBtn"
                            data-selected={
                              style.style === extraStyle ? true : false
                            }
                          >
                            <span class="__prevWrap editor-styles-wrapper">
                              <span
                                className={ classnames( '__prev', {
                                  [ 'is-style-' + style.style ]: !! style.style,
                                  [ 'has-box-style' ]: style.style,
                                } ) }
                              ></span>
                            </span>
                            <span class="__prevTitle">
                              { style.buttonText }
                            </span>
                          </label>
                        </div>
                      );
                    } ) }
                  </div>
                </div>
              </PanelBody>
            </InspectorControls>
          ) }
        </Fragment>
      );
    }

    return <BlockEdit { ...props } />;
  };
}, 'addCustomEdit' );
addFilter(
  'editor.BlockEdit',
  'cocoon-blocks/style-custom-edit',
  addCustomEdit
);

// 親ブロックへのクラス適用
const applyAttributesToBlock = createHigherOrderComponent(
  ( BlockListBlock ) => {
    return ( props ) => {
      const { attributes, className, name, isValid } = props;

      if ( isValid && allowedBlocks.includes( name ) ) {
        const { extraStyle, extraBorder } = attributes;

        return (
          <BlockListBlock
            { ...props }
            className={ classnames( className, {
              [ 'is-style-' + extraStyle ]: !! extraStyle,
              [ 'is-style-' + extraBorder ]: !! extraBorder,
              [ 'has-border' ]: extraBorder,
              [ 'has-box-style' ]: extraStyle,
            } ) }
          />
        );
      }

      return <BlockListBlock { ...props } />;
    };
  },
  'applyAttributesToBlock'
);
addFilter(
  'editor.BlockListBlock',
  'cocoon-blocks/style-apply-attributes',
  applyAttributesToBlock
);

// Save拡張
const addCustomSave = ( props, blockType, attributes ) => {
  if ( allowedBlocks.includes( blockType.name ) ) {
    const { className } = props;
    const { extraStyle, extraBorder } = attributes;

    props.className = classnames( className, {
      [ 'is-style-' + extraStyle ]: !! extraStyle,
      [ 'is-style-' + extraBorder ]: !! extraBorder,
      [ 'has-border' ]: extraBorder,
      [ 'has-box-style' ]: extraStyle,
    } );

    return Object.assign( props );
  }
  return props;
};
addFilter(
  'blocks.getSaveContent.extraProps',
  'cocoon-blocks/style-custom-save',
  addCustomSave
);