# frozen_string_literal: true

class User < ApplicationRecord
  validates :email, format: { with: URI::MailTo::EMAIL_REGEX }, presence: true, unique: true

  before_save :downcase_email

  has_secure_password

  private

    def downcase_email
      self.email = email.downcase
    end
end
