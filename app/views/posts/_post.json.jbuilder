json.extract! post, :id, :title, :body, :published, :factorial, :created_at, :updated_at
json.url post_url(post, format: :json)
