package com.encaps.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class ApplicationExceptionHandler
        extends ResponseEntityExceptionHandler {

//    @ResponseStatus(
//            value = HttpStatus.NOT_FOUND,
//            reason = "Requested Resource Not Found")
//    @ExceptionHandler(SampleRuntimeException.class)
//    public ResponseEntity<Object> handleBadRequest(HttpServletRequest servletRequest, Exception exc) {
//        var sUri = servletRequest.getRequestURI();
//        //request.getDescription(false);
//        HttpStatus httpStatus = HttpStatus.NOT_FOUND;
//
//        return new ResponseEntity<Object>(
//                String.format("""
//                        {
//                        "timestamp": "%s",
//                        "status": %d,
//                        "title": "%s",
//                        "detail": "%s",
//                        "instance": "%s"
//                        }
//                        """, LocalDateTime.now(), httpStatus.value(), httpStatus.getReasonPhrase(), exc.getMessage(), sUri), httpStatus);
//
//    }


    @ExceptionHandler({SampleRuntimeException.class})
    public ResponseEntity<Object> handleAccessDeniedException(
            Exception exc, HttpServletRequest servletRequest) {
        final HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        var sUri = servletRequest.getRequestURI();
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;

        return new ResponseEntity<Object>(
                String.format("""
                        {
                            "timestamp": "%s",
                            "status": %d,
                            "title": "%s",
                            "detail": "%s",
                            "instance": "%s"
                        }
                        f""", LocalDateTime.now(), httpStatus.value(), httpStatus.getReasonPhrase(), exc.getMessage(), sUri), httpHeaders, httpStatus);
    }

//extends ResponseEntityExceptionHandler {
//
//    @ExceptionHandler(value
//            = { SampleRuntimeException.class,
//            IllegalArgumentException.class,
//            ServletException.class })
//    protected ResponseEntity<Object> handleConflict(
//            RuntimeException ex, WebRequest request, HttpServletRequest servletRequest) {
//
//                final HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//        var sUri = servletRequest.getRequestURI();
//        HttpStatus httpStatus = HttpStatus.NOT_FOUND;
//        String bodyOfResponse = String.format("""
//                        {
//                        "timestamp": "%s",
//                        "status": %d,
//                        "title": "%s",
//                        "detail": "%s",
//                        "instance": "%s"
//                        }
//                        """, LocalDateTime.now(), httpStatus.value(), httpStatus.getReasonPhrase(), ex.getMessage(), sUri);
//        return handleExceptionInternal(ex, bodyOfResponse,
//                httpHeaders, httpStatus, request);
//    }

}
