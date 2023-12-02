# frozen_string_literal: true

class User < ApplicationRecord
  MIN_PASSWORD_LENGTH = 6

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true, uniqueness: true
  validates :password, length: { minimum: MIN_PASSWORD_LENGTH }, if: -> { password.present? }
  validates :password_confirmation, presence: true, on: :create

  before_save :downcase_email

  has_secure_password
  has_secure_token :authentication_token

  private

    def downcase_email
      self.email = email.downcase
    end
end
