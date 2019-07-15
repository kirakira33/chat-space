class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  before_filter :set_locale

  def set_locale
    I18n.locale = locale
  end

  def locale
    @locale ||= params[:locale] || I18n.default_locale
  end

  def default_url_options(options={})
    options.merge(locale: locale)
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
