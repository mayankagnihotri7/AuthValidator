# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      render_notice("User was successfully created.")
    else
      render_error(user.errors.full_messages.to_sentence)
    end
  end

  private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
