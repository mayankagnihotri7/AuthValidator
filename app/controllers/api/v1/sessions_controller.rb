# frozen_string_literal: true

class Api::V1::SessionsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token

  def create
    @user = User.find_by!(email: login_params[:email].downcase)
    unless @user.authenticate(login_params[:password])
      render_error("Incorrect credentials, try again.", :unauthorized)
    else
      render json: { user: @user, notice: "Login successful." }
    end
  end

  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end
