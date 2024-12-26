package com.encaps.sample;

public record SampleDto(
        Integer id,
        String title
) {

    public static SampleDto mapEntity(SampleEntity e){
        return new SampleDto(
                e.getId(),
                e.getTitle()
        );
    }
}
