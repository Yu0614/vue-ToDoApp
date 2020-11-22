# Contributing to vue-ToDoApp

## 開発ルール
  
#### プロジェクト全般

* Lint の導入
  * ESLint + prettier で 誰が書いても同様のルールで統率します

* コメントを関数に記載する
  * 実装当時に開発者が意図した挙動と変わることを避けられます。

* 自動化、省力化を積極的に進める
  * 本質の改善、修繕、新機能の追加に時間を費やせるようにします


### Coding Rules

#### TypeScript関連
  * 基本Any型を許可しない
  * 型の宣言では enum をできるだけ使用せず、Union型で表現する
    * Tree Shakingの際に バンドルに含まれてしまうことを避ける
      * コンパイル時に即時関数を作り出すので使われているかどうか判断できないデメリット

#### コミットルール
[Angular のコミットルール](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format)をそのまま
このプロダクトのコミットルールとします。

#### <a name="commit-header"></a>Commit Message Header

```
 <type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|dev-infra|docs-infra|migrations|
  │                          ngcc|ve
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.


##### Type

以下のいずれかを使用してください。条件は以下参照。

* **build**: 既存のビルドシステム、または外部の依存モジュールへの変更の場合に使用します 
  * (gulp, broccoli, npm, etc...)
  
* **ci**: CI関連のコードへの修正の場合使用します。
  * (Circle, BrowserStack, SauceLabs , etc...)
  
* **docs**: ドキュメントのみの修正の場合に使用します。
  
* **feat**: 新しいモジュール、機能の追加の際に使用します。
  
* **fix**: バグフィックスの場合に使用します。
  
* **perf**: パフォーマンスの改善に寄与する場合に使用します。

* **refactor**: バグフィックスや新機能追加以外のコード変更の場合に使用します。

* **test**: 新しいテストの追加、既存のテスト変更の際に使用します。