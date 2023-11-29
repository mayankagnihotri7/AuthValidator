# frozen_string_literal: true

class User < ApplicationRecord
  before_save :downcase_email

  has_secure_password

  validates :email, format: { with: URI::MailTo::EMAIL_REGEX }, presence: true, unique: true

  private

  def downcase_email
    self.email = email.downcase
  end
end
