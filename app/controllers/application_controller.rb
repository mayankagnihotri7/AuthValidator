# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user_using_x_auth_token

  def errors_to_sentence
    errors.full_messages.to_sentence
  end

  def render_notice(message, status = :ok, context = {})
    render status:, json: { notice: message }.merge(context)
  end

  def render_error(error, status = :unprocessable_entity, context = {})
    error_message = error
    is_exception = error.kind_of?(StandardError)
    if is_exception
      is_having_record = error.methods.include? "record"
      error_message = is_having_record ? message.record&.errors.full_messages.to_sentence : error.message
    end
    render status:, json: { error: error_message }.merge(context)
  end

  private

    def authenticate_user_using_x_auth_token
      user_email = request.headers["X-Auth-Email"].presence
      auth_token = request.headers["X-Auth-Token"].presence
      user = user_email && User.find_by!(email: user_email)
      is_valid_token = user && auth_token && ActiveSupport::SecurityUtils.secure_compare(
        user.authentication_token,
        auth_token
      )
      if is_valid_token
        @current_user = user
      else
        render_error("Could not authenticate with the provided credentials", :unauthorized)
      end
    end

    def current_user
      @current_user
    end
end
