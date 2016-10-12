# gc-vision-app
GCPやGoogle Cloud Vision APIを試すためのNode.jsアプリケーションです。

## ビルド手順
- ライブラリのインストール
```
npm Install
```

- ビルド
```
npm run prestart
```


## ローカル環境での実行方法
- 環境変数の設定
```
export VISION_API_KEY=YOUR_API_KEY
```

- 起動
```
node app
```

## Google App Engineへのデプロイ

- 事前準備  
Google Cloud SDKのインストールや設定は済ませておいてください。

- 設定ファイルの修正  
app.yamlのVISION_API_KEYに自身のキーを設定してください。

- デプロイコマンド実行
```
npm run deploy
```

