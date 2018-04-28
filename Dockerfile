FROM elixir:1.5 as build

# Set exposed ports
EXPOSE 4200
ENV PORT=5000 MIX_ENV=prod

USER default
COPY ssh-id_rsa_github /root/.ssh/id_rsa_github
COPY ssh-config /root/.ssh/config

# Cache elixir deps
ADD mix.exs mix.lock ./
RUN mix do deps.get, deps.compile

COPY config ./config
COPY ui/dist ./ui/dist
COPY certs ./certs
COPY mix.exs .
COPY mix.lock .
COPY apps ./apps

#RUN mix do compile

#CMD ["mix", "phx.server"]
ENTRYPOINT ["/bin/bash"]

