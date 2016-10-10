# gc-vision-app
GCPやGoogle Cloud Vision APIを試すためのNode.jsアプリケーションです。

## ローカル環境での実行方法

1. ライブラリのインストール
```
npm Install
```

2. 環境変数の設定
```
export VISION_API_KEY=YOUR_API_KEY
```

3. 起動
```
node app
```

## Goolge App Engineへのデプロイ

1. 事前準備  
Google Cloud SDKのインストールや設定は済ませておいてください。

1. 設定ファイルの修正  
app.yamlのVISION_API_KEYに自身のキーを設定してください。

2. デプロイコマンド実行
```
gcloud app deploy
```

