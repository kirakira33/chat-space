# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## userテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|text|null: false|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|text|null: false|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|body|text||
|image|string||


### Association
- belongs_to :user
- belomgs_to :group
