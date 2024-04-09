import classnames from 'classnames/dedupe';

/**
 * WordPress
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { hasBlockSupport, getBlockType } from '@wordpress/blocks';
import { PanelBody, CustomSelectControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Block
 */
import metadata from './block.json';
import './style.scss';
import './editor.scss';
import { clearAnimationDelayClasses, clearAnimationTypeClasses } from "./utils";

export const animationTypes = [
	{
		key: '',
		name: 'アニメーション無し',
	},
	{
		key: 'fadeIn',
		name: 'フェードイン',
	},
	{
		key: 'fadeInUp',
		name: '下からフェードイン',
	},
	{
		key: 'fadeInDown',
		name: '上からフェードイン',
	},
];
export const animationDelayOptions = [
	{
		key: '',
		name: '0ms',
	},
	{
		key: '100ms',
		name: '100ms',
	},
	{
		key: '200ms',
		name: '200ms',
	},
	{
		key: '300ms',
		name: '300ms',
	},
	{
		key: '400ms',
		name: '400ms',
	},
	{
		key: '500ms',
		name: '500ms',
	},
	{
		key: '600ms',
		name: '600ms',
	},
	{
		key: '700ms',
		name: '700ms',
	},
	{
		key: '800ms',
		name: '800ms',
	},
	{
		key: '900ms',
		name: '900ms',
	},
	{
		key: '1000ms',
		name: '1000ms',
	},
];

/**
 * 設定追加
 *
 * @param settings
 * @returns {*}
 */
const addBlockAttributes = ( settings ) => {

	settings.attributes = {
		...settings.attributes,
		...metadata.attributes,
	};
	return settings;
};
// 設定追加
addFilter(
	'blocks.registerBlockType',
	'ysbna/attributes',
	addBlockAttributes
);

// 設定項目追加
const addBlockControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, setAttributes, name } = props;
		// 設定取得.
		const {
			ysbnaAnimationType,
			ysbnaAnimationDelay,
			className,
		} = attributes;

		// ブロック情報.
		const blockType = getBlockType( name );
		// カスタムクラスの設定に対応しているブロックかチェック.
		if ( !hasBlockSupport( blockType, 'customClassName', true ) ) {
			return <BlockEdit {...props} />;
		}

		// アニメーションタイプの更新
		const handleOnChangeAnimationType = ( { selectedItem } ) => {
			const value = selectedItem.key;
			const newClassnames = clearAnimationTypeClasses( className, ysbnaAnimationType );
			console.log( { newClassnames } );
			setAttributes( {
				ysbnaAnimationType: value,
				className: classnames( newClassnames, {
					[ `ysbna-animation-type--${value}` ]: value,
				} ),
			} );
		}
		// アニメーションディレイの更新
		const handleOnChangeAnimationDelay = ( { selectedItem } ) => {
			const value = selectedItem.key;
			const newClassnames = clearAnimationDelayClasses( className, ysbnaAnimationDelay );
			setAttributes( {
				ysbnaAnimationDelay: value,
				className: classnames( newClassnames, {
					[ `ysbna-animation-delay--${value}` ]: value,
				} ),
			} );
		}
		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={'[YSBNA]アニメーション'} initialOpen={false}>
						<CustomSelectControl
							label="アニメーションタイプ"
							options={animationTypes}
							onChange={handleOnChangeAnimationType}
							value={animationTypes.find( ( option ) => option.key === ysbnaAnimationType )}
						/>
						<CustomSelectControl
							label="アニメーション遅延"
							options={animationDelayOptions}
							onChange={handleOnChangeAnimationDelay}
							value={animationDelayOptions.find( ( option ) => option.key === ysbnaAnimationDelay )}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
} );

addFilter(
	'editor.BlockEdit',
	'ysbna/block-edit',
	addBlockControl,
	Number.MAX_SAFE_INTEGER
);
