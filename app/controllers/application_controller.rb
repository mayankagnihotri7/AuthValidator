# frozen_string_literal: true

class ApplicationController < ActionController::Base
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
end
