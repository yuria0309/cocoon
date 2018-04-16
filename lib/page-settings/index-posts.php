<?php //インデックス設定をデータベースに保存
//エントリーカードタイプ
update_theme_option(OP_ENTRY_CARD_TYPE);

//エントリーカード枠線の表示
update_theme_option(OP_ENTRY_CARD_BORDER_VISIBLE);

//エントリーカード抜粋文の最大文字数
update_theme_option(OP_ENTRY_CARD_EXCERPT_MAX_LENGTH);

///////////////////////////////////////
// 投稿情報の表示
///////////////////////////////////////

//投稿日を表示
update_theme_option(OP_ENTRY_CARD_POST_DATE_VISIBLE);

//更新日を表示
update_theme_option(OP_ENTRY_CARD_POST_UPDATE_VISIBLE);

//投稿者を表示
update_theme_option(OP_ENTRY_CARD_POST_AUTHOR_VISIBLE);