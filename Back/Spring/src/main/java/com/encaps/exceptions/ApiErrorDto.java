package com.encaps.exceptions;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public record ApiErrorDto(
        String path,
        String msg,
        Integer status,
        String timestamp
) {
}
