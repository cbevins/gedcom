var simplemaps_countrymap_mapdata={
    main_settings: {
     //General settings
      width: "responsive", //'700' or 'responsive'
      background_color: "#FFFFFF",
      background_transparent: "yes",
      border_color: "#ffffff",
      
      //State defaults
      state_description: "State description",
      state_color: "#88A4BC",
      state_hover_color: "#3B729F",
      state_url: "",
      border_size: 1.5,
      all_states_inactive: "no",
      all_states_zoomable: "yes",
      
      //Location defaults
      location_description: "Location description",
      location_url: "",
      location_color: "#FF0067",
      location_opacity: 0.8,
      location_hover_opacity: 1,
      location_size: 25,
      location_type: "square",
      location_image_source: "frog.png",
      location_border_color: "#FFFFFF",
      location_border: 2,
      location_hover_border: 2.5,
      all_locations_inactive: "no",
      all_locations_hidden: "no",
      
      //Label defaults
      label_color: "#ffffff",
      label_hover_color: "#ffffff",
      label_size: 16,
      label_font: "Arial",
      label_display: "auto",
      label_scale: "yes",
      hide_labels: "no",
      hide_eastern_labels: "no",
     
      //Zoom settings
      zoom: "yes",
      manual_zoom: "yes",
      back_image: "no",
      initial_back: "no",
      initial_zoom: "-1",
      initial_zoom_solo: "no",
      region_opacity: 1,
      region_hover_opacity: 0.6,
      zoom_out_incrementally: "yes",
      zoom_percentage: 0.99,
      zoom_time: 0.5,
      
      //Popup settings
      popup_color: "white",
      popup_opacity: 0.9,
      popup_shadow: 1,
      popup_corners: 5,
      popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
      popup_nocss: "no",
      
      //Advanced settings
      div: "map",
      auto_load: "yes",
      url_new_tab: "no",
      images_directory: "default",
      fade_time: 0.1,
      link_text: "View Website",
      popups: "detect"
    },
    state_specific: {
      BEBRU: {
        name: "Brussels",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      BEVAN: {
        name: "Antwerp",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      BEVBR: {
        name: "Flemish Brabant",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      BEVLI: {
        name: "Limburg",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      BEVOV: {
        name: "East Flanders",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      BEVWV: {
        name: "West Flanders",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      BEWBR: {
        name: "Walloon Brabant",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      BEWHT: {
        name: "Hainaut",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      BEWLG: {
        name: "Liege",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      BEWLX: {
        name: "Luxembourg",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      BEWNA: {
        name: "Namur",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      }
    },
    locations: {
      "0": {
        name: "Brussels",
        lat: "50.833333",
        lng: "4.333333"
      }
    },
    labels: {
      BEBRU: {
        name: "Brussels",
        parent_id: "BEBRU"
      },
      BEVAN: {
        name: "Antwerp",
        parent_id: "BEVAN"
      },
      BEVBR: {
        name: "Flemish Brabant",
        parent_id: "BEVBR"
      },
      BEVLI: {
        name: "Limburg",
        parent_id: "BEVLI"
      },
      BEVOV: {
        name: "East Flanders",
        parent_id: "BEVOV"
      },
      BEVWV: {
        name: "West Flanders",
        parent_id: "BEVWV"
      },
      BEWBR: {
        name: "Walloon Brabant",
        parent_id: "BEWBR"
      },
      BEWHT: {
        name: "Hainaut",
        parent_id: "BEWHT"
      },
      BEWLG: {
        name: "Liege",
        parent_id: "BEWLG"
      },
      BEWLX: {
        name: "Luxembourg",
        parent_id: "BEWLX"
      },
      BEWNA: {
        name: "Namur",
        parent_id: "BEWNA"
      }
    },
    legend: {
      entries: []
    },
    regions: {}
  };