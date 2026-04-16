package com.rsquare.portal.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private final boolean success;
    private final String message;
    private T data;

    private ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public static <T> ApiResponse<T> ok(String message, T data) {
        ApiResponse<T> r = new ApiResponse<>(true, message);
        r.data = data;
        return r;
    }

    public static <T> ApiResponse<T> ok(T data) {
        return ok("success", data);
    }

    public static ApiResponse<Void> ok(String message) {
        return new ApiResponse<>(true, message);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message);
    }

    /** Used in GlobalExceptionHandler to attach validation errors map. */
    public ApiResponse<T> withData(T d) {
        this.data = d;
        return this;
    }
}
