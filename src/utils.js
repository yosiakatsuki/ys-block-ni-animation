import { animationDelayOptions, animationTypes } from "./index";

export function clearAnimationTypeClasses( classnames, current ) {
	const types = animationTypes.map( item => item.key );
	let newClassnames = (classnames || '').replace( `ysbna-animation-type--${current}`, '' );
	// アニメーションタイプのクラスを削除する.
	types.forEach( type => {
		if ( type ) {
			newClassnames = newClassnames.replace( `ysbna-animation-type--${type}`, '' );
			// 連続する空白を詰める
			newClassnames = newClassnames.replace( '  ', ' ' );
		}
	} );

	// 連続する空白を詰める
	newClassnames = newClassnames.replace( '  ', ' ' );
	return newClassnames.trim();
}

export function clearAnimationDelayClasses( classnames, current ) {
	const types = animationDelayOptions.map( item => item.key );
	let newClassnames = (classnames || '').replace( `ysbna-animation-delay--${current}`, '' );
	// アニメーションタイプのクラスを削除する.
	types.forEach( type => {
		if ( type ) {
			newClassnames = newClassnames.replace( `ysbna-animation-delay--${type}`, '' );
			// 連続する空白を詰める
			newClassnames = newClassnames.replace( '  ', ' ' );
		}
	} );

	// 連続する空白を詰める
	newClassnames = newClassnames.replace( '  ', ' ' );
	return newClassnames.trim();
}
