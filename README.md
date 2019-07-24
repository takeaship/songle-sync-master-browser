# Songle Sync ブラウザ向けプロジェクト

ブラウザで動作するシンプルな Songle Sync アプリケーション例です  

## Songle Sync のサイト上で Token を発行

初めての方は新規登録が必要です  
以下のURLから新規登録し、`accessToken`と`secretToken`を取得してください

http://api.songle.jp/u/sign_in

## Tokenを設定する

secrets.jsの以下の箇所を取得したTokenに書き換える

```javascript
window.accessToken = "YOUR_ACCESS_TOKEN";
window.secretToken = "YOUR_SECRET_TOKEN";
```

## 起動方法

 `index.html` をブラウザで開いてください。  
右下に動画が表示され、再生・停止・先頭へシーク・サビ出しが出来ます。  

```
[ファイルパス]/index.html
```
