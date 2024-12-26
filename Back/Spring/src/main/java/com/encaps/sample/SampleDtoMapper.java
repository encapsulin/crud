package com.encaps.sample;

import java.util.function.Function;

public class SampleDtoMapper implements Function<SampleEntity, SampleDto> {
    @Override
    public SampleDto apply(SampleEntity e) {
        var dto = new SampleDto(e.getId(),e.getTitle());
        return dto;
    }
}
