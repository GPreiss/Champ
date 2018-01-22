class Post < ApplicationRecord
  before_save :post_factorial

  def post_factorial
   i = rand(1..10)
   self.factorial = (1..i).reduce(:*) || 1
 end

end
